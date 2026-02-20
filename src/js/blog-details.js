const blogData = {
    'healthy-heart': {
        title: "10 Tips for a Healthy Heart",
        date: "Oct 24, 2025",
        author: "Admin",
        category: "Health Tips",
        image: "../assets/images/cardiology.png",
        content: `
            <p class="mb-4">Maintaining a healthy heart is crucial for longevity. Discover simple lifestyle changes that can act as a shield against cardiovascular diseases. Your heart is the engine of your body, and keeping it running smoothly requires a combination of good nutrition, regular exercise, and stress management.</p>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Eat a Heart-Healthy Diet</h3>
            <p class="mb-4">Focus on whole foods, including plenty of fruits, vegetables, whole grains, and lean proteins. Limit saturated fats, trans fats, and excessive sodium. Foods rich in omega-3 fatty acids, like salmon and walnuts, are particularly good for heart health.</p>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Get Moving</h3>
            <p class="mb-4">Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous activity each week. Activities like brisk walking, swimming, or cycling can significantly lower your risk of heart disease.</p>

            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Manage Stress</h3>
            <p class="mb-4">Chronic stress can contribute to high blood pressure and other heart-related issues. finding healthy ways to cope with stress, such as meditation, deep breathing exercises, or spending time with loved ones, is essential.</p>
            
            <p class="mb-4">By incorporating these tips into your daily routine, you can strengthen your heart and improve your overall quality of life.</p>
        `
    },
    'mri-technology': {
        title: "New MRI Technology Arrives",
        date: "Oct 20, 2025",
        author: "Dr. Smith",
        category: "Medical News",
        image: "../assets/images/neurology.png",
        content: `
            <p class="mb-4">We are proud to announce the installation of the latest MRI scanner, providing faster and more accurate diagnostics for our patients. This state-of-the-art machine represents a significant upgrade in our diagnostic capabilities.</p>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Advanced Imaging Capabilities</h3>
            <p class="mb-4">The new scanner offers higher resolution images, allowing our radiologists to detect even the smallest anomalies with greater precision. This is particularly crucial for early detection of neurological and musculoskeletal conditions.</p>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Improved Patient Experience</h3>
            <p class="mb-4">Designed with patient comfort in mind, the new machine features a wider bore and faster scan times, reducing anxiety and discomfort often associated with traditional MRI scans.</p>

            <p class="mb-4">This investment underscores our commitment to providing the highest standard of care to our community.</p>
        `
    },
    'managing-stress': {
        title: "Managing Stress in Daily Life",
        date: "Oct 15, 2025",
        author: "Admin",
        category: "Wellness",
        image: "../assets/images/pediatrics.png",
        content: `
            <p class="mb-4">Stress is a silent killer. Learn effective techniques to manage stress and improve your mental and physical well-being. In today's fast-paced world, finding balance is more important than ever.</p>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Identify Your Triggers</h3>
            <p class="mb-4">The first step in managing stress is recognizing what causes it. Keep a journal to track situations that make you feel anxious or overwhelmed. Once you identify your triggers, you can develop strategies to cope with them.</p>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Practice Mindfulness</h3>
            <p class="mb-4">Mindfulness involves being present in the moment. Techniques such as deep breathing, meditation, and yoga can help calm your mind and reduce stress hormones in the body.</p>

            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Prioritize Sleep</h3>
            <p class="mb-4">Lack of sleep can exacerbate stress. Ensure you are getting 7-9 hours of quality sleep each night to allow your body and mind to recharge.</p>
        `
    },
    'dental-hygiene': {
        title: "Dental Care Hygiene 101",
        date: "Oct 12, 2025",
        author: "Dr. Lee",
        category: "Health Tips",
        image: "../assets/images/dental.png",
        content: `
            <p class="mb-4">Proper dental hygiene is more than just brushing. Here is what you need to know to keep your smile bright and healthy. Oral health is a window to your overall health.</p>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Brush and Floss Daily</h3>
            <p class="mb-4">Brush your teeth at least twice a day with fluoride toothpaste and floss daily to remove plaque and food particles from between your teeth.</p>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Watch Your Diet</h3>
            <p class="mb-4">Avoid sugary snacks and drinks, which can lead to tooth decay. Instead, choose water, fruits, and vegetables that are good for your teeth and gums.</p>

            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Regular Checkups</h3>
            <p class="mb-4">Visit your dentist at least every six months for a professional cleaning and checkup to catch any issues early.</p>
        `
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id') || 'healthy-heart'; // Default
    const post = blogData[blogId] || blogData['healthy-heart'];

    // Update Meta Title
    document.title = `${post.title} - MediCare Blog`;

    // Populate Content
    document.getElementById('blog-category').textContent = post.category;
    document.getElementById('blog-title').textContent = post.title;
    document.getElementById('blog-meta-date').textContent = post.date;
    document.getElementById('blog-meta-author').textContent = post.author;
    document.getElementById('blog-image').src = post.image;
    document.getElementById('blog-content').innerHTML = post.content;
});
