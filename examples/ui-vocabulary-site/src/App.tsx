import { useMemo, useState } from "react"
import { BookOpen, Download, Search, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { TermCard } from "@/components/term-card"
import { TermDetail } from "@/components/term-detail"
import { categories, terms, type TermCategory, type VocabularyTerm } from "@/data/terms.generated"
import { categoryLabels, searchTerms } from "@/lib/search"
import { cn } from "@/lib/utils"

function App() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<TermCategory | "all">("all")
  const [selectedTerm, setSelectedTerm] = useState<VocabularyTerm | null>(terms[0] ?? null)
  const [detailOpen, setDetailOpen] = useState(false)

  const filteredTerms = useMemo(() => searchTerms(terms, query, category), [query, category])
  const categoryCounts = useMemo(
    () =>
      categories.map((item) => ({
        category: item,
        count: terms.filter((term) => term.category === item).length,
      })),
    []
  )

  function selectTerm(term: VocabularyTerm) {
    setSelectedTerm(term)
    setDetailOpen(true)
  }

  function saveAsPdf() {
    window.print()
  }

  return (
    <main className="min-h-svh bg-background">
      <nav className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur" data-print-hidden>
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 md:px-8 lg:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen aria-hidden="true" className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-foreground">UI 용어 사전</p>
              <p className="hidden text-xs text-muted-foreground sm:block">이름과 생김새를 함께 보는 컴포넌트 레퍼런스</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Badge variant="secondary" className="hidden rounded-md px-3 py-1 text-sm sm:inline-flex">
              {filteredTerms.length} / {terms.length} terms
            </Badge>
            <Button className="h-9 rounded-md" size="sm" variant="outline" onClick={saveAsPdf}>
              <Download aria-hidden="true" />
              PDF로 저장
            </Button>
          </div>
        </div>
      </nav>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 md:px-8 lg:px-10">
        <header className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Badge variant="secondary" className="w-fit rounded-md px-3 py-1 text-sm sm:hidden">
              {filteredTerms.length} / {terms.length} terms
            </Badge>
            <div>
              <p className="text-sm font-medium text-muted-foreground">UI Vocabulary Encyclopedia</p>
              <h1 className="text-3xl font-semibold tracking-normal text-foreground md:text-5xl">UI 용어 사전</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                바이브코딩과 UI/UX 설계에서 자주 쓰는 화면 요소의 이름, 쓰임새, 생김새를 한곳에서 확인합니다.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center" data-print-hidden>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="h-11 pl-9 pr-10"
                placeholder="토글, 모달, dropdown, combobox..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query && (
                <Button
                  aria-label="검색어 지우기"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => setQuery("")}
                >
                  <X aria-hidden="true" />
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                className={cn("h-8 rounded-md", category === "all" && "border-primary")}
                size="sm"
                variant={category === "all" ? "default" : "outline"}
                onClick={() => setCategory("all")}
              >
                전체 {terms.length}
              </Button>
              {categoryCounts.map((item) => (
                <Button
                  key={item.category}
                  className={cn("h-8 rounded-md", category === item.category && "border-primary")}
                  size="sm"
                  variant={category === item.category ? "default" : "outline"}
                  onClick={() => setCategory(item.category)}
                >
                  {categoryLabels[item.category]} {item.count}
                </Button>
              ))}
            </div>
          </div>
        </header>

        <Separator />

        {filteredTerms.length > 0 ? (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-print-grid>
            {filteredTerms.map((term, index) => (
              <TermCard
                key={term.id}
                index={index}
                selected={selectedTerm?.id === term.id}
                term={term}
                onSelect={selectTerm}
              />
            ))}
          </section>
        ) : (
          <section className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-lg border bg-card p-8 text-center">
            <p className="text-lg font-semibold">검색 결과가 없습니다.</p>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              한국어 이름, 영어 이름, alias, 설명, 프롬프트 문장을 모두 검색합니다. 예: 토글, modal, dropdown.
            </p>
            <Button variant="outline" onClick={() => { setQuery(""); setCategory("all") }}>
              전체 용어 보기
            </Button>
          </section>
        )}
      </section>

      <TermDetail open={detailOpen} term={selectedTerm} onOpenChange={setDetailOpen} />
    </main>
  )
}

export default App
