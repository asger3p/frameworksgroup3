// Insert the footer HTML into the DOM
document.getElementById('footer-container').innerHTML = `
    <footer class="footer mt-5 py-4">
        <div class="container">
            <div class="row">
                <!-- About Spice Planet -->
                <div class="col-md-6 text-start">
                    <h5>About Spice Planet</h5>
                    <p class="footer-description">
                        Spice Planet brings you the finest spices and flavors from around the world. 
                        Join our community for cooking inspiration, exclusive recipes, and special offers.
                    </p>
                </div>

                <!-- Newsletter Signup -->
                <div class="col-md-6 text-end">
                    <h5>Sign up for our newsletter</h5>
                    <p class="footer-subtext">Get exclusive recipes, spice tips, and member-only discounts straight to your inbox.</p>
                    
                    <form class="newsletter-form d-flex justify-content-end">
                        <input type="email" id="newsletter-email" class="form-control me-2" placeholder="Enter your email" required>
                        <button type="submit" class="btn btn-primary">Subscribe</button>
                    </form>

                    <!-- Social Media Icons -->
                    <div class="social-icons mt-3">
                        <a href="#" class="me-2"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="me-2"><i class="bi bi-instagram"></i></a>
                        <a href="#"><i class="bi bi-twitter"></i></a>
                    </div>
                </div>
            </div>

            <!-- Copyright -->
            <div class="text-center mt-3">
                <p class="small mb-0">&copy; 2025 Spice Planet. All rights reserved.</p>
            </div>
            <!-- Back to Top Button -->
            <button id="back-to-top" class="btn btn-primary" onclick="window.scrollTo({ top: 0, behavior: 'smooth' });" style="position: fixed; bottom: 20px; right: 20px; display: none;">↑</button>
        </div>
    </footer>
`;

// Show the Back to Top button when scrolling
window.onscroll = function() {
    let button = document.getElementById("back-to-top");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
};
