// backend/src/services/index.ts
import { InMemoryFileStore } from './store/InMemoryFileStore'
import { InMemoryMetadataStore } from './metadata/InMemoryMetaDataStore'
import { InMemoryLinkService } from './link/InMemoryLinkService'
import { InMemoryPaymentService } from './payment/InMemoryPaymentService'

export const fileStore = new InMemoryFileStore()
export const metadataStore = new InMemoryMetadataStore()
export const linkService = new InMemoryLinkService()
export const paymentService = new InMemoryPaymentService()
