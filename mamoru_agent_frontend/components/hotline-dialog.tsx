import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Phone, ExternalLink } from "lucide-react"

interface HotlineDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HotlineDialog({ open, onOpenChange }: HotlineDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Phone className="h-6 w-6 text-blue-500" />
            労働相談ホットライン
          </DialogTitle>
          <DialogDescription className="text-base">
            以下のホットラインでは、労働条件に関する相談を受け付けています。
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">労働条件相談ほっとライン</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                平日夜間・土日休日に、労働条件に関する相談を無料で受け付けています。
              </p>
              <div className="flex items-center justify-between gap-4">
                <a
                  href="https://www.check-roudou.mhlw.go.jp/lp/hotline/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  詳しい情報を見る
                </a>
                <Button
                  onClick={() => (window.location.href = "tel:0120-811-610")}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  電話する
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <h4 className="font-medium mb-2">受付時間</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>平日（月～金）：午後5時～午後10時</li>
              <li>土日・祝日：午前9時～午後9時</li>
            </ul>
          </div>

          <div className="text-sm text-muted-foreground">
            ※お急ぎの場合や、より詳しい相談を希望される場合は、 お近くの労働基準監督署への相談をお勧めします。
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

