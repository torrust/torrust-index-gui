export type RegistrationForm = {
  username: string
  email: string
  password: string
  confirm_password: string
}

export function random_user_registration_data (): RegistrationForm {
  return {
    username: `user${random_user_id()}`,
    email: `user${random_user_id()}@example.com`,
    password: "12345678",
    confirm_password: "12345678"
  };
}

function random_user_id (): number {
  return Math.floor(Math.random() * 1000000);
}
