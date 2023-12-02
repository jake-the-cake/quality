window.addEventListener('DOMContentLoaded', () => {
  customElements.define('sliding-element', SlidingElement);
  
  const accordian = useAccordian('main')

  const perPage: HTMLSelectElement = document.querySelector('#labels-per-page')!
  perPage!.addEventListener('change', (e) => {
    e.preventDefault()
    const target = e.target as any
    const value = target.value
    if (value < 1) target.value = 1
    if (value > 10) target.value = 10
  })

  // const label = document.getElementById('label-view')
  // const page = {
  //   width: 8.2,
  //   height: 10.4,
  //   gap: .1
  // }
  // label!.style.width = (page.width - page.gap) / 2 + 'in'
  // label!.style.height = (page.height - (page.gap * Number(perPage.value) / 2))/ (Number(perPage.value) / 2) + 'in'

  // console.log(label)
})

class SlidingElement extends HTMLElement {
  open(height: string, direction: string = 'height') { (this as any).style[direction] = height }
  close(direction: string = 'height') { (this as any).style[direction] = '0px' }
}

function capitalizeFirstChar(value: string, strict?: true): string {
  return value[0].toUpperCase() + strict ? value.slice(1).toLowerCase() : value.slice(1)
}

type SliderWrapper = HTMLElement & {
  open: (height: string, direction?: string) => void,
  close: (direction?: string) => void
}

function useAccordian(target: string) {
  const main = document.querySelector(target)
  if (!main )throw new Error('Target was not found.')
  const slides = Array.from(main.children).filter((slide: Element) => slide.localName !== 'script' && slide.id !== 'app-controls')

  const data: any[] = []
  
  slides?.forEach((slide: Element, slideIndex: number) => {
    const wrapper: SliderWrapper = document.createElement('sliding-element') as SliderWrapper
    const wrapperHeight = (slide as HTMLElement).offsetHeight + 'px'
    main.removeChild(slide)
    wrapper.appendChild(slide)
    wrapper.classList.add('of-hidden', 'flex')
    wrapper.style.transition = 'height .3s ease '
    data.push({ wrapperHeight, wrapper, slideId: slide.id })
    wrapper.close()
    main.appendChild(wrapper)
  })

  const controls = document.querySelector('#app-controls')
  const buttons = main?.querySelectorAll('button')
  // const buttons = controls?.querySelectorAll('button')

  buttons?.forEach((button) => {
    if (button.onclick) return
    button.onclick = () => {
      data.forEach((item) => {
        item.wrapper.close()
      })
      console.log(button.value)
      const slide = data.filter((item) => item.slideId === button.value)[0]
      slide.wrapper.open(slide.wrapperHeight)
      console.log(slide)
    }
  })


  return { data }
}

// 
// 
// 
// SAVE THIS CODE BELOW AND WORK INTO SOMETHING
// 
// 
// 
//   if (direction === 'horizontal' || direction === 'h') direction = 'height'
//   else if (direction === 'vertical' || direction === 'v' || direction === 'w') direction = 'width'
//   else throw new Error('Invalid accordian direction: ' + direction)