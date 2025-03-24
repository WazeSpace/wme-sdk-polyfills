/* eslint-disable @typescript-eslint/no-explicit-any */
import { getWindow } from '@wme-enhanced-sdk/utils';
import { defaultFetchInterceptor, isOfEndpoint, createJsonResponse } from '@wme-enhanced-sdk/fetch-interceptor';
import { PropertySwapper } from '@wme-enhanced-sdk/method-interceptor';

function patchAbortControllerOnce() {
  const window = getWindow<{ W: any }>();
  const swapper = new PropertySwapper(window.W.controller.descartesClient, 'createAbortController');
  swapper.swap(() => {
    swapper.restore();
    return new AbortController();
  });
}

function getFeatures<RN extends string>(repositoryName: RN): Promise<{
  [K in RN]: {
    objects: any[];
  };
}> {
  const window = getWindow<{ W: any }>();
  // patch the createAbortController to return a new instance which doesn't aborts ongoing requests
  // so they can be resolved normally
  patchAbortControllerOnce();
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
