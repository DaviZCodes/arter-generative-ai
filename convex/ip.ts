import { mutation } from "./_generated/server";

export const saveIpAddress = mutation(
  async ({ db }, { ip }: { ip: string }) => {
    //insert is same as a POST
    const ipAddress = await db.insert("ips", {
      ip,
    });

    console.log("ip uploaded:", ip);
    return ip;
  }
);

//note: this is for security purposes to ban users who abuse this software. No information will be used incorrectly. No information will be shared.
//Everything will be kept confidential.
