let ctn = document.querySelector(".p_container");
console.log(ctn);
let data = [];
fetch("https://dummyjson.com/product")
    .then((e) => e.json())
    .then((e) => {
        // console.log(e.products);
        data = e.products;
        displayData(data);
    })
    .catch((err) => {
        console.error(err);
    });

function displayData(product) {
    let input = " "
    product.map((val) => {
            let id = val.id;
            let title = val.title;
            let img = val.images[0];
            let dis = val.discountPercentage;
            let rating = val.rating;
            let price = val.price;

            input =
                input +
                `<div class="max-w-md w-full m-auto ">
  <div
    class="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl">
    <div class="relative">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-600 opacity-75"></div>
    <a href="./productView.html" class="">
      <img onclick="getid(${id})" src=" ${img}" alt="Product Image" class="w-full h-64 object-fit-cover object-center relative z-10">
    </a>
      <div
        class="absolute top-4 right-4 bg-gray-100 text-xs font-bold px-3 py-2 rounded-full z-20 transform rotate-12">
        ${dis.toFixed(1)}% Off</div>
    </div>
    <div class="p-6">
      <h2 class="text-3xl font-extrabold text-gray-800 mb-2">${title.split(" ").slice(0,3).join(" ") }</h2>
      <p class="text-gray-600 mb-4">Experience music like never before with our state-of-the-art Cosmic Headphones.
        Immerse yourself in crystal-clear sound and unparalleled comfort.</p>
      <div class="flex items-center justify-between mb-4">
        <span class="text-2xl font-bold text-indigo-600">$${price}</span>
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20"
            fill="currentColor">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="ml-1 text-gray-600">${rating} (120 reviews)</span>
        </div>
      </div>
      <button onclick="addToCart(${id})" class="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            Add to Cart
      </button>
    </div>
  </div>
</div>`;
        });
        console.log(input)
        ctn.innerHTML = input;
    }
    function getid(id){
      console.log(id)
      localStorage.setItem("productId",id)
      window.location.href="/productView.html";
    }
   

    function addToCart(id) {
      let result = data.find((val) =>{ return val.id == id})
      console.log(result);
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      let isExist = cartItems.find((val) => { return val.id == id})
      if(isExist){
        alert("Product already in cart!");
      }
      else{
        cartItems.push(result);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        alert("Product added to cart!");
      }
    }