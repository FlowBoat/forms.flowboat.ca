// next.config.ts
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig = {
  sassOptions: {
    implementation: "sass-embedded"
  }
};

export default nextConfig;

initOpenNextCloudflareForDev();
