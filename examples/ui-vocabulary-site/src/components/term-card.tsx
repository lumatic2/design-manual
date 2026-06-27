import { memo } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TermVisual } from "@/components/term-visual"
import type { VocabularyTerm } from "@/data/terms.generated"
import { categoryLabels, kindLabels, searchMatchReasonLabels, type SearchMatchReason } from "@/lib/search"
import { cn } from "@/lib/utils"

type TermCardProps = {
  term: VocabularyTerm
  matchReasons?: SearchMatchReason[]
  selected: boolean
  onSelect: (term: VocabularyTerm) => void
}

export const TermCard = memo(function TermCard({ term, matchReasons = [], selected, onSelect }: TermCardProps) {
  const openDetail = () => onSelect(term)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      openDetail()
    }
  }

  return (
    <Card
      data-export-card={term.id}
      data-print-card
      role="button"
      tabIndex={0}
      onClick={openDetail}
      onKeyDown={handleKeyDown}
      className={cn(
        "overflow-hidden rounded-lg transition hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected && "border-primary shadow-md"
      )}
    >
      <CardHeader>
        <div className="min-w-0">
          <Badge variant="outline" className="mb-2 rounded-md text-xs">
            {categoryLabels[term.category]}
          </Badge>
          {term.kind !== "component" && (
            <Badge variant="secondary" className="mb-2 ml-2 rounded-md text-xs">
              {kindLabels[term.kind]}
            </Badge>
          )}
          <CardTitle className="text-xl leading-7 tracking-normal">
            <span className="block break-keep">{term.ko.name}</span>
            <span className="mt-1 block break-words text-sm font-normal leading-5 text-muted-foreground">
              {term.en.name}
            </span>
          </CardTitle>
          {matchReasons.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {matchReasons.slice(0, 2).map((reason) => (
                <Badge key={reason} variant="secondary" className="rounded-md text-[10px]">
                  {searchMatchReasonLabels[reason]}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TermVisual variant={term.asset.variant} label={term.ko.name} />
        <div className="flex flex-col gap-2">
          <p className="line-clamp-2 min-h-12 text-sm leading-6 text-muted-foreground">{term.one_liner}</p>
          <p className="rounded-md bg-accent px-3 py-2 text-sm leading-5 text-accent-foreground">
            {term.prompt_phrases[0]}
          </p>
        </div>
      </CardContent>
    </Card>
  )
})
