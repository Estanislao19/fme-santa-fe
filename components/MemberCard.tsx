import Link from "next/link";
import type { Member } from "@/types";
import { DemoLabel, PhotoPlaceholder } from "./ui";
import { whatsappLink } from "@/utils/links";
export default function MemberCard({
  member,
  index = 0,
}: {
  member: Member;
  index?: number;
}) {
  const phone = member.phone ? whatsappLink(member.phone) : null;
  return (
    <article className="member-card">
      <Link
        className="member-image"
        href={`/socias/${member.slug}`}
        aria-label={`Conocer a ${member.name}`}
      >
        <PhotoPlaceholder
          label={member.business}
          image={member.image}
          variant={["sand", "sage", "blue"][index % 3]}
        />
        <span className="member-image-arrow" aria-hidden="true">
          ↗
        </span>
      </Link>
      <div className="member-category">{member.category}</div>
      <h3>
        <Link href={`/socias/${member.slug}`}>{member.business}</Link>
      </h3>
      <p className="member-name">{member.name}</p>
      <p>{member.description}</p>
      {member.demo && <DemoLabel />}
      <div className="member-links">
        <Link href={`/socias/${member.slug}`}>Conocé su historia ↗</Link>
        {phone && <a href={phone}>Contactar ↗</a>}
        {member.instagram && (
          <a href={member.instagram} target="_blank" rel="noopener noreferrer">
            Ver Instagram ↗
          </a>
        )}
      </div>
    </article>
  );
}
