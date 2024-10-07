import { Publisher , ExpirationCompletedEvent, Subjects} from "@vb430/common";


export class ExpirationCompletePublisher extends Publisher<ExpirationCompletedEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}