const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('cart-modal')
const cartItensContainer = document.getElementById('cart-itens')
const cartTotal = document.getElementById('cart-total')
const checkout = document.getElementById('checkout-btn')
const closeModalBtn = document.getElementById('close-modal-btn')
const cartCounter = document.getElementById('cart-count')
const addressInput = document.getElementById('address')
const addressWarn = document.getElementById('address-warn')

    let cart = []

    cartBtn.addEventListener('click', ()=>{
        cartModal.style.display = 'flex'
        updateCartModal()
    })

    cartModal.addEventListener('click', (event)=>{
    if(event.target === cartModal){
        cartModal.style.display = 'none'
    }
    })

    closeModalBtn.addEventListener('click', ()=>{
        cartModal.style.display = 'none'
    })

        menu.addEventListener('click',(event)=>{
        let parentButton = event.target.closest('.add-to-cart-btn')
        if(parentButton){
            const name = parentButton.getAttribute('data-name')
            const price = parseFloat(parentButton.getAttribute('data-price')).toFixed(2)
            const img = parentButton.getAttribute('data-img')

        addToCart(name, price,img)
        
        }
        })

        function addToCart(name, price, img){
            const existingItem = cart.find(item => item.name === name)
            if(existingItem){
                existingItem.quantity += 1
                return;
            }else{
                cart.push({
                    name,
                    price,
                    img,
                    quantity:1
                })
            }

            updateCartModal()
          
        }

        function updateCartModal(){

            cartItensContainer.innerHTML = ''
            let total = 0;

            cart.forEach(item=>{
               const cartItensElement = document.createElement('div')
               cartItensElement.classList.add('flex','justify-between','mb-4', 'flex-col')
               cartItensElement.innerHTML = `
               
               <div class='flex items-center justify-between bg-gray-200 px-2 py-2 rounded'>
               <div>
               <img src=${item.img} class='rounded' style="width: 50px; height: 50px;">
               <p class="font-thin">${item.name}</p>
               <p class="font-thin">Quantidade: ${item.quantity}</p>
               <p class="font-thin" >R$ ${item.price}</p>
               </div>
               <div>
               <button class="remove" data-name="${item.name}">
              Remover
               </button>
               </div>
               </div>
               
               `

               total += item.price * item.quantity

               cartItensContainer.appendChild(cartItensElement)
            })
                cartTotal.textContent =total.toLocaleString('pt-br',{
                    style:'currency',
                    currency:'BRL'
                })
                cartCounter.innerHTML = cart.length
        
            }

            cartItensContainer.addEventListener('click', (event)=>{
                if(event.target.classList.contains('remove')){
                    const name = event.target.getAttribute('data-name')
                   removeItenCart(name)
                }
            })

            function removeItenCart(name){
                const index = cart.findIndex(item => item.name === name)
                if(index != -1){
                    const item = cart[index]
                   if(item.quantity > 1){
                    item.quantity -= 1
                    updateCartModal()
                    return;
                   }
                   
                }
                cart.splice(index,1)
                updateCartModal()
            }

            addressInput.addEventListener('input', (event)=>{
                let inputValue = event.target.value
                if(inputValue != ''){
                    addressWarn.classList.add('hidden')
                }
            })

            checkout.addEventListener('click', ()=>{
                if(cart.length === 0) return
                if(addressInput.value === ''){
                    addressWarn.classList.remove('hidden')
                    return;
                }
                const cartItens = cart.map((item)=>{
                    return(
                        ` *${item.name}*, Quantidade: (${item.quantity}), Preço: R$ ${item.price}`
                    )
                }).join('')
               const massage = encodeURIComponent(cartItens)
               const phone = '98984395595'

               window.open(`https://wa.me/${phone}?text=${massage} Endereço: ${addressInput.value}`,'_blank')
            })