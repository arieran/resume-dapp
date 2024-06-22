import EtherIcon from '@/assets/icons/ethereum.png'
import NotificationIcon from '@/assets/icons/notification.png'
import Login from '@/assets/icons/auth.png'
import Register from '@/assets/icons/ens.png'

export const EXAMPLE_ITEMS = [
  {
    title: 'Login',
    description: 'This example is demonstrates how to login.',
    image: Login.src,
    url: '/examples/Login',
  },
  {
    title: 'Register',
    description: 'This example is demonstrates how to register.',
    image: Register.src,
    url: '/examples/Register',
  },
  {
    title: 'Send Ether',
    description: 'Sending Ether to another address is the most basic, common transaction that you can do.',
    image: EtherIcon.src,
    url: '/examples/send-ether',
  },
  {
    title: 'Notifications',
    description: 'This example is demonstrates how to use the notification system within Nexth.',
    image: NotificationIcon.src,
    url: '/examples/notifications',
  }
]
