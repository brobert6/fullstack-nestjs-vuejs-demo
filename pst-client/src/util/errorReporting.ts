// import {
//     ApplicationInsights, ITelemetryItem,
//   } from '@microsoft/applicationinsights-web';

const shouldReportToInsights = false

// const appInsights = new ApplicationInsights({
//     config: {
//       instrumentationKey: '',
//       connectionString: 'InstrumentationKey=[...];IngestionEndpoint=https://eastus-5.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/',
//       enableRequestHeaderTracking: true,
//       enableResponseHeaderTracking: true,
//       enableCorsCorrelation: true,
//       enableAjaxErrorStatusText: true,
//     },
//   });

export function reportError(err: any) {
  if (shouldReportToInsights) {
    // TODO: Add Application Insights
    // appInsights.loadAppInsights();
    // appInsights.addTelemetryInitializer((envelope: ITelemetryItem) => {
    //     const itemTags: Record<string, any> = envelope.tags || [];
    //     const env = Env.insightsEnv;
    //     itemTags['ai.cloud.role'] = 'Core.WebUi';
    //     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    //     itemTags['ai.cloud.roleInstance'] = `Core.WebUi.${env}.${envelope.ext?.device.deviceClass}`;
    // });
    // appInsights.trackPageView();
  } else {
    // In non-production env, just report in console to ease development
    // eslint-disable-next-line no-console
    console.error(err)
  }
}
