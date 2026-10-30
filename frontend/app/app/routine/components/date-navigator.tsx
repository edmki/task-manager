import { Button } from "@/components/ui/button";
import { useSelectedDate } from "@/hooks/routine/use-selected-date";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DateNavigator() {
  const { date, prev, next, today } = useSelectedDate();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={prev}
        aria-label="Dia anterior"
      >
        <ChevronLeft />
      </Button>
      <Button variant="outline" onClick={today}>
        Hoje
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={next}
        aria-label="Próximo dia"
      >
        <ChevronRight />
      </Button>
      <span className="capitalize">
        {format(date, "EEEE, d 'de' MMMM", { locale: ptBR })}
      </span>
    </div>
  );
}
