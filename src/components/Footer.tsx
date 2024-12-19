import Link from "next/link"


function Footer() {
    return (
      <footer className="bg-card text-card-foreground  py-4 bottom-0 absolute mx-auto  ">
          {/* <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
          <div className="flex sm:items-center flex-col">
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="mb-4">
              Learning School is a premier institution dedicated to teaching the art
              and science of music. We nurture talent from the ground up,
              fostering a vibrant community of musicians.
            </p>
          </div>
          <div className="flex sm:items-center flex-col">
            <h2 className=" text-lg font-semibold mb-4">Quick Links</h2>
            <ul>
              <li>
              <Link
                  href="/"
                  className="transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <Link
                  href="/courses"
                  className=" transition-colors duration-300"
                >
                  Courses
                </Link>
              </li>
              <li>
              <Link
                  href="/contact"
                  className=" transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex sm:items-center flex-col">
            <h2 className=" text-lg font-semibold mb-4">Follow Us</h2>
             <div className="flex flex-col ">
              <a
                href="#"
                className=" transition-colors duration-300"
              >
                Facebook
              </a>
              <a
                href="#"
                className=" transition-colors duration-300"
              >
                Twitter
              </a>
              <a
                href="#"
                className=" transition-colors duration-300"
              >
                Instagram
              </a>
            </div>
          </div>
          <div className="flex sm:items-center flex-col">
              <h2 className=" text-lg font-semibold mb-4">Contact Us</h2>
            <div className="w-fit">
              <p>New Delhi, India</p>
              <p>Delhi 10001</p>
              <p>Email: info@musicschool.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
          </div> */}
          {/* <div className="mx-auto py-0 text-center">
            <p className="">© 2025 Learning School. All rights reserved.</p>

          </div> */}
      </footer>
    )
  }
  
  export default Footer