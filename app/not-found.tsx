import { PageHero, Button } from "@/components/ui";
export default function NotFound() {
  return (
    <PageHero
      eyebrow="404 · PÁGINA NO ENCONTRADA"
      title="Este camino todavía no está disponible."
      description="Podés volver al inicio o conocer los emprendimientos de nuestra comunidad."
    >
      <div className="actions">
        <Button href="/">Volver al inicio</Button>
        <Button href="/socias" secondary>
          Explorar socias
        </Button>
      </div>
    </PageHero>
  );
}
