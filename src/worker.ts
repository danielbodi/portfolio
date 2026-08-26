interface AssetsBinding {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  ASSETS: AssetsBinding;
}

/**
 * Sites requires a Cloudflare Worker entrypoint. Static assets are still
 * handled by the asset binding, with SPA fallback configured in Vite.
 */
export default {
  fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(request);
  }
};
