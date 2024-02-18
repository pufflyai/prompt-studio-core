# SDK Integration

Integrating Prompt Studio's capabilities into your application is seamless with our SDK. Currently supporting JavaScript/TypeScript, the SDK allows you to execute recipes with ease. Below is a guide on how to get started with the SDK.

## Prerequisites

Before integrating the SDK, ensure you have:

- A valid Prompt Studio account with API access.
- The `@prompt-studio/sdk` package installed in your project.

## Installation

To install the SDK, run the following command in your project directory:

```bash
npm install @prompt-studio/sdk
```

or if you're using `yarn`:

```bash
yarn add @prompt-studio/sdk
```

## Usage

Here's a quick example to execute a deployment:

```typescript
import { runDeployment, type DeploymentConfig } from '@prompt-studio/sdk';

const run = async () => {
  const apiKey = process.env.PS_API_KEY;
  const config: DeploymentConfig = {
    apiKey,
    deploymentId: 'your-deployment-id',
    deploymentInput: {
      // Your input data here
    }
  };

  try {
    const result = await runDeployment(config);
    console.log('Deployment result:', result);
  } catch (error) {
    console.error('Error running deployment:', error);
  }
};

run();
```

Replace `'your-deployment-id'` with the actual ID of your deployment and provide the necessary input data.


## Support

If you encounter any issues or have questions regarding the SDK integration, please reach out to our [support team](mailto:support@prompt.studio) or visit the FAQ section.
