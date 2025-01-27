import { BookingStatus } from "../models/booking.model";

export function getStatusInfo(status: BookingStatus) {
    switch (status) {
        case 'confirmed':
            return {
                icon: 'check_circle',
                color: 'green',
                label: 'Confermata'
            }
        case 'cancelled':
            return {
                icon: 'cancel',
                color: 'red',
                label: 'Annullata'
            }
        default:
            return {
                icon: 'hourglass_empty',
                color: 'orange',
                label: 'In Attesa'
            }
    }
}
