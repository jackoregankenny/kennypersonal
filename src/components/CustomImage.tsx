import Image from 'next/image';

export default function CustomImage({ src, alt, ...props }: any) {
  return (
    <div className="custom-image-wrapper">
      <Image
        src={src}
        alt={alt}
        width={700}
        height={475}
        layout="responsive"
        {...props}
      />
    </div>
  );
}