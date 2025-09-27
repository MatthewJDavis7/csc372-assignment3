document.addEventListener("DOMContentLoaded", () => {
    const favSection = document.createElement("section");
    document.body.appendChild(favSection);

    const favHeading = document.createElement("h1");
    favHeading.textContent = "Favorites";
    favSection.appendChild(favHeading);

    const favList = document.createElement("ul");
    favSection.appendChild(favList);

    const favTotal = document.createElement("p");
    favTotal.textContent = "Total: $0";
    favSection.appendChild(favTotal);

    const prices = {
        "Reuben": 13.99,
        "Chicken Philly": 15.99,
        "Black Bean Quesadilla": 13.99,
        "Chicken Tikka Masala": 17.99,
        "Garlic Naan": 3.99,
        "Chicken Biryani": 11.99,
        "Stromboli": 15.99,
        "Buffalo Chicken Pizza": 14.99,
        "Garlic Knots": 5.99
    }

    const dishs = document.querySelectorAll('.flex-item');

    const fav = new Map();

    dishs.forEach(card => {
        const name = card.querySelector("h3").textContent;
        const price = prices[name] || 0;

        card.dataset.name = name;
        card.dataset.price = price;

        const priceTag = document.createElement("p");
        priceTag.textContent = `$${price.toFixed(2)}`;
        card.appendChild(priceTag);

        const btn = document.createElement("button");
        btn.textContent = "Add to Favorites";
        card.appendChild(btn);

        btn.addEventListener("click", () => {
            const name = card.dataset.name;
            const price = parseFloat(card.dataset.price);

            if (fav.has(name)) {
                fav.delete(name);
                card.classList.remove("highlight");
                btn.textContent = "Add to Favorites";
            } else {
                fav.set(name, price);
                card.classList.add("highlight");
                btn.textContent = "Remove from Favorites";
            }

            updateFav();
        })
    })

    function updateFav() {
        while (favList.firstChild) {
            favList.removeChild(favList.firstChild);
        }

        let total = 0;

        fav.forEach((price, name) => {
            const li = document.createElement("li");
            li.textContent = `${name} - $${price.toFixed(2)}`;
            favList.appendChild(li);
            total += price;
        });

        favTotal.textContent = `Total: $${total.toFixed(2)}`;
    }
})