window.addEventListener('DOMContentLoaded', () {
  const accordian = useAccordian()
})

class SlidingElement extends Element {
  slide: Element
  open: () => void
  close: () => void

  constructor(slide: Element) {
    super()
    this.slide = slide
    this.open = () => {
      console.log('open')
    }
    this.close = () => {
      console.log('close')
    }
  }
}

function useAccordian(direction: string = 'vertical') {
  if (direction === 'horizontal' || direction === 'h') direction = 'height'
  else if (direction === 'vertical' || direction === 'v') direction = 'width'
  else throw new Error('Invalid accordian direction: ' + direction)
  
  const slides = Array.from(document.querySelector('main')!.children).filter((slide: Element) => slide.localName !== 'script')
  
  slides?.forEach((slide: Element, slideIndex: number) => {
    // slide = slide as any
    slide.id = slideIndex + '-' + slide.id
    console.log(slide.id)
    console.log(slide)
    slide = new SlidingElement(slide)
    // slide.
    // slide.actions.open
  })
}