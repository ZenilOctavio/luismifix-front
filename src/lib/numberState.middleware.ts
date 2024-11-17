import { KeyboardEventHandler } from 'react'

const isMoving = (key: string) => {
  return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)
}

export const numbersMiddleware = (limit?: number, allowNegatives: boolean = false, allowDecimal: boolean = false, decimalLimit: number = 2) => {
  const onKeyDownCapture: KeyboardEventHandler<HTMLInputElement> = (e) => {


    if (isMoving(e.key)) return
    if (e.key === 'Backspace' || e.key === 'Delete') return
    if (e.currentTarget.value == '0' && e.key === '0') e.preventDefault()

    if (allowDecimal) {
      const decimalPart = e.currentTarget.value.split('.')[1]
      if (decimalPart) {
        if (decimalPart.length >= decimalLimit) {
          e.preventDefault()
        }
      }
      if (e.key === '.') return

    }

    if (allowNegatives && e.key === '-') return


    if (limit != undefined && e.currentTarget.valueAsNumber > limit) e.preventDefault()

    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }

  }


  return {
    onKeyDownCapture
  }
}

