import swal from 'sweetalert';

export const notificationService = {
  showNotification: (
    title: string,
    text: string,
    type?: 'error' | 'warning' | 'success'
  ) => {
    swal({
      title,
      text,
      icon: type,
      buttons: {
        cancel: true,
      },
      className: `notification-${type}`,
    });
  },
};
