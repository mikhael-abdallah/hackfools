import { createGovs } from './seeds/countries';
async function seed() {
  await createGovs();
}

seed().then();
