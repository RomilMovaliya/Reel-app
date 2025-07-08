declare module "@zegocloud/zego-uikit-prebuilt-live-streaming-rn" {
  import { ComponentType } from "react";

  export interface ZegoUIKitPrebuiltLiveStreamingProps {
    appID: string;
    appSign: string;
    userID: string;
    userName: string;
    liveID: string;
    config?: any;
  }

  export const HOST_DEFAULT_CONFIG: any;
  export const AUDIENCE_DEFAULT_CONFIG: any;

  const ZegoUIKitPrebuiltLiveStreaming: ComponentType<ZegoUIKitPrebuiltLiveStreamingProps>;
  export default ZegoUIKitPrebuiltLiveStreaming;
}
