import { defineConfig } from 'checkly'
import { EmailAlertChannel, Frequency } from 'checkly/constructs'

const emailChannel = new EmailAlertChannel('email-channel-1', {
  address: 'sasararasajanindia@gmail.com',
})

export default defineConfig({
  projectName: 'Todo App Monitoring',
  logicalId: 'todo-app-monitoring',
  repoUrl: 'https://github.com/SajanRajbanshi/playwright-gitaction',
  checks: {
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['smoke'],
    runtimeId: '2024.02',
    frequency: Frequency.EVERY_6H,
    checkMatch: '**/__checks__/**/*.check.ts',
    alertChannels: [emailChannel],
    playwrightConfig: {
      use: {
        baseURL: 'https://playwright-gitaction.vercel.app/',
      },
    },
    browserChecks: {
      testMatch: '**/tests/todo.spec.ts',
    },
  },
  cli: {
    runLocation: 'us-east-1',
  },
})
