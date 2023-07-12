import "../e2e/contexts/user/commands";
import { RegistrationForm } from "../e2e/contexts/user/registration";

declare global {
  namespace Cypress {
    interface Chainable {
      // Registration
      register(registration_form: RegistrationForm): Chainable<void>
      register_as_admin(registration_form: RegistrationForm): Chainable<void>
      // Authentication
      login(username: string, password: string): Chainable<void>
    }
  }
}
