import request from 'supertest';
import app from '../../src/app';
import path from 'path';

describe('SnapSend API Integration Tests', () => {
  let uploadedFileId: string;

  it('should create a payment session', async () => {
    const res = await request(app)
      .post('/api/payment/session')
      .send({ fileId: 'test123', amount: 199, currency: 'usd' })
      .expect(200);

    expect(res.body).toHaveProperty('transactionId');
    expect(res.body.status).toBe('succeeded');
    expect(res.body).toHaveProperty('paidAt');
  });

  it('should upload a file', async () => {
    const res = await request(app)
      .post('/api/upload')
      .attach('file', path.resolve(__dirname, '../fixtures/sample.txt'))
      .expect(200);

    expect(res.body).toHaveProperty('fileId');
    expect(res.body).toHaveProperty('expiresAt');
    expect(res.body).toHaveProperty('downloadUrl');
    uploadedFileId = res.body.fileId;
  });

  it('should get file metadata', async () => {
    const res = await request(app)
      .get(`/api/file/${uploadedFileId}/metadata`)
      .expect(200);

    expect(res.body.fileId).toBe(uploadedFileId);
    expect(res.body).toHaveProperty('filename');
    expect(res.body).toHaveProperty('size');
    expect(res.body).toHaveProperty('expiresAt');
    expect(res.body.isExpired).toBe(false);
  });

  it('should download and delete file', async () => {
  const res = await request(app)
    .get(`/api/file/${uploadedFileId}/download?token=mock-token`)
    .buffer(true)
    .parse((res, callback) => {
      const chunks: Uint8Array[] = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => callback(null, Buffer.concat(chunks)));
    })
    .expect(200);

  expect(res.headers['content-disposition']).toMatch(/attachment/);
  expect(res.headers['content-type']).toBeDefined();
  expect(res.body).toBeInstanceOf(Buffer);
});

  it('should return 404 on second download attempt', async () => {
    await request(app)
      .get(`/api/file/${uploadedFileId}/download?token=mock-token`)
      .expect(404);
  });
});
