import Image from "next/image";

function Logo() {
  return (
    <Image
    height={130}
    width={130}
    alt="LOGO"
    src="/logo.png"
    />
  )
}

export default Logo