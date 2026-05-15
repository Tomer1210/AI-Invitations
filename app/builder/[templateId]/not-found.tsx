import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { content } from "@/lib/content/he";

export default function BuilderNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center">
      <Container>
        <h1 className="text-2xl font-semibold text-foreground">
          התבנית לא נמצאה
        </h1>
        <p className="text-hebrew-body mt-3 text-muted">
          ייתכן שהתבנית הוסרה או שהקישור שגוי.
        </p>
        <Link href="/#templates" className="mt-8 inline-block">
          <Button>{content.builder.backToTemplates}</Button>
        </Link>
      </Container>
    </div>
  );
}
