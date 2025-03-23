/* eslint-disable @typescript-eslint/no-explicit-any */
import { getWindow } from '@wme-enhanced-sdk/utils';
import { defaultFetchInterceptor, isOfEndpoint, createJsonResponse } from '@wme-enhanced-sdk/fetch-interceptor';

function getFeatures<RN extends string>(repositoryName: RN): Promise<{
  [K in RN]: {
    objects: any[];
  };
}> {
  const window = getWindow<{ W: any }>();
  return window.W.controller.descartesClient.getFeatures(
    [0,0,0,0],
    { [repositoryName]: true },
    {}
  );
}

export async function resolveEntityPrototype<RN extends string>(repositoryName: RN, emptyObject: any) {
  const window = getWindow<{ W: any }>();
  const requestPath = window.W.Config.paths.features;
  defaultFetchInterceptor.addInterceptionFilter({
    shouldIntercept: isOfEndpoint(requestPath),
    intercept(): Promise<Response> {
      return Promise.resolve(createJsonResponse(
        requestPath,
        {
          [repositoryName]: {
            objects: [emptyObject],
          },
        },
      ));
    },
  });

  const { [repositoryName]: repositoryObjects } = await getFeatures(repositoryName);
  const [entity] = repositoryObjects.objects;
  return entity.constructor;
}
