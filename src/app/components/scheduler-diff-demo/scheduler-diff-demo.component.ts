import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { animationFrameScheduler, asyncScheduler, defer, EMPTY, interval, NEVER, Observable, Subject, timer } from 'rxjs'
import { filter, map, scan, skipWhile, startWith, switchMap, takeUntil, windowToggle } from 'rxjs/operators'

@Component({
  selector: 'rx-scheduler-diff-demo',
  templateUrl: './scheduler-diff-demo.component.html',
  styleUrls: [ './scheduler-diff-demo.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulerDiffDemoComponent {

  public delayControl: FormControl = new FormControl(17)

  public isPauseControl: FormControl = new FormControl(true)

  public isPause: boolean = true

  public resetNotify: Subject<void> = new Subject<void>()

  public defaultScheduler: Observable<string> = defer(() => {
    let accumulatorValue: number = 0

    return this.delayControl.valueChanges.pipe(
      startWith(this.delayControl.value),
      switchMap((delay: number) => interval(delay)),
      filter(() => !this.isPause),
      map(() => accumulatorValue += 1.5, 0),
      map((value: number) => value + 'deg')
    )
  })

  public asyncScheduler: Observable<string> = defer(() => {
    let accumulatorValue: number = 0

    return this.delayControl.valueChanges.pipe(
      startWith(this.delayControl.value),
      switchMap((delay: number) => interval(delay, asyncScheduler)),
      skipWhile(() => !this.isPause),
      filter(() => !this.isPause),
      map(() => accumulatorValue += 1.5, 0),
      map((value: number) => value + 'deg')
    )
  })

  public animationFrameScheduler: Observable<string> = defer(() => {
    let accumulatorValue: number = 0

    return this.delayControl.valueChanges.pipe(
      startWith(this.delayControl.value),
      switchMap((delay: number) => interval(delay, animationFrameScheduler)),
      filter(() => !this.isPause),
      map(() => accumulatorValue += 1.5, 0),
      map((value: number) => value + 'deg')
    )
  })

  public toggleButtonLabel: Observable<string> = this.isPauseControl.valueChanges.pipe(
    startWith(this.isPauseControl.value),
    map((isPause: boolean) => isPause ? '▶️ Start' : '⏸ Pause')
  )

  public onClickToggleButton(): void {
    this.isPauseControl.patchValue(!this.isPauseControl.value)
    this.isPause = !this.isPause
  }

  public onClickResetButton(): void {
    this.resetNotify.next()
  }
}
