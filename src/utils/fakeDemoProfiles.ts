
import { faker } from '@faker-js/faker';

// Export faker for use in other components
export { faker };

// Original demo profiles function
export const fakeDemoProfiles = Array.from({ length: 8 }, (_, i) => ({
  id: `demo-${i + 1}`,
  first_name: faker.person.firstName(),
  avatar: null
}));
