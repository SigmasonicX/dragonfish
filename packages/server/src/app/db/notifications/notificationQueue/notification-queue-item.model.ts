import { NotificationKind } from '@dragonfish/models/notifications';
import { PublishStatus } from './publish-status';

// Base interface
export interface NotificationQueueItem {
    _id: string;

    /**
     * The ID of the thing (Work, Document, Blog, etc) that triggered this notification.
     */
    sourceId: string;
    kind: NotificationKind;
    publishStatus: PublishStatus;
    createdAt: Date;
    updatedAt: Date;
}
