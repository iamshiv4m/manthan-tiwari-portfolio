import { ImageResponse } from "next/og";
import { fetchInstagramProfile } from "@/lib/instagram";
import { fetchCdnImageAsDataUrl } from "@/lib/instagram-image";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const profile = await fetchInstagramProfile(
    "https://www.instagram.com/MANTHANLIFTS/",
  );
  const dataUrl = profile?.profileImageUrl
    ? await fetchCdnImageAsDataUrl(profile.profileImageUrl)
    : null;

  if (dataUrl) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background: "#050505",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dataUrl}
            alt=""
            width={180}
            height={180}
            style={{ objectFit: "cover" }}
          />
        </div>
      ),
      { ...size },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: "#c8ff00",
          color: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
        }}
      >
        M
      </div>
    ),
    { ...size },
  );
}
