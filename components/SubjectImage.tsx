import Image from 'next/image';
import { getSubjectColor } from '@/lib/utils';

interface SubjectImageProps {
  subject: string;
  divHeight?: number | string;
  divWidth?: number | string;
  imageHeight?: number;
  imageWidth?: number;
  isMobile?: boolean; // added for potential mobile handling
}

export default function SubjectImage({
  subject,
  divHeight = '60px', // default fallback
  divWidth = '60px',
  imageHeight = 40,
  imageWidth = 40,
  isMobile = false, // added for potential mobile handling
}: SubjectImageProps) {
  return (
    <div
      className={`flex justify-center items-center rounded-md ${isMobile ? "max-sm:hidden" : ""}`}
      style={{
        backgroundColor: getSubjectColor(subject),
        height: divHeight,
        width: divWidth,
      }}
    >
      <Image
        src={`/icons/${subject}.svg`}
        alt={subject}
        height={imageHeight}
        width={imageWidth}
      />
    </div>
  );
}
