import { useEffect, useRef, useState } from "react";

interface NewsLetterFormProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const NewsLetterForm: React.FC<NewsLetterFormProps> = ({
  onSuccess,
  onError,
}) => {
  const mailchimpFormRef = useRef<HTMLDivElement>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js";
    script.type = "text/javascript";

    document.body.appendChild(script);

    script.onload = () => {
      if ((window as any).fnames) {
        (window as any).$mcj = (window as any).jQuery.noConflict(true);
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const form = document.getElementById(
      "mc-embedded-subscribe-form"
    ) as HTMLFormElement;

    if (!form) return;

    const handleSubmit = () => {
      setTimeout(() => {
        const successMessage = document.getElementById("mce-success-response");
        const errorMessage = document.getElementById("mce-error-response");

        if (
          successMessage &&
          window.getComputedStyle(successMessage).display !== "none"
        ) {
          setToastType("success");
          setToastMessage(
            "🎉 Welcome aboard! You've successfully joined our newsletter."
          );
          setShowToast(true);
          if (onSuccess) onSuccess();
        } else if (
          errorMessage &&
          window.getComputedStyle(errorMessage).display !== "none"
        ) {
          setToastType("error");

          // Get the actual error message from Mailchimp or provide a better default
          const errorText = errorMessage.textContent || "";
          let friendlyMessage =
            "🚫 Oops! Something went wrong. Please check your email and try again.";

          if (errorText.toLowerCase().includes("already subscribed")) {
            friendlyMessage =
              "✨ You're already part of our community! Thanks for your enthusiasm.";
          } else if (
            errorText.toLowerCase().includes("invalid") ||
            errorText.toLowerCase().includes("valid email")
          ) {
            friendlyMessage =
              "📧 Please enter a valid email address to join our newsletter.";
          } else if (
            errorText.toLowerCase().includes("required") ||
            errorText.toLowerCase().includes("blank")
          ) {
            friendlyMessage =
              "📝 Please fill in all required fields to continue.";
          } else if (errorText.toLowerCase().includes("too many")) {
            friendlyMessage =
              "⏰ Too many attempts. Please wait a moment before trying again.";
          } else if (
            errorText.toLowerCase().includes("network") ||
            errorText.toLowerCase().includes("connection")
          ) {
            friendlyMessage =
              "🌐 Network error. Please check your connection and try again.";
          }

          setToastMessage(friendlyMessage);
          setShowToast(true);
          if (onError) onError();
        }
      }, 1000);
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, [onSuccess, onError]);

  return (
    <div className="w-full space-y-4 flex flex-col justify-center items-center">
      <h2 className="uppercase text-lg md:text-2xl font-semibold text-center">
        JOIN OUR NEWSLETTER
      </h2>
      <p className="text-gray-700 text-center">
        Receive insider news and valuable social media tips from our team, so
        you never miss a beat!
      </p>

      <div ref={mailchimpFormRef} className="w-full">
        <div id="mc_embed_signup">
          <form
            action="https://your-mailchimp-url-here.list-manage.com/subscribe/post"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
          >
            <div id="mc_embed_signup_scroll">
              <div className="mc-field-group mb-4">
                <input
                  type="text"
                  name="FNAME"
                  placeholder="First Name"
                  className="border border-gray-300 rounded-md px-3 py-2 text-xs w-full focus:outline-none focus:border-[#F2720D]"
                  id="mce-FNAME"
                />
              </div>
              <div className="mc-field-group mb-4">
                <input
                  type="email"
                  name="EMAIL"
                  placeholder="Email Address"
                  className="border border-gray-300 rounded-md px-3 py-2 text-xs w-full focus:outline-none focus:border-[#F2720D]"
                  id="mce-EMAIL"
                  required
                />
              </div>

              <div id="mce-responses" className="clear foot">
                <div
                  className="response"
                  id="mce-error-response"
                  style={{ display: "none" }}
                ></div>
                <div
                  className="response"
                  id="mce-success-response"
                  style={{ display: "none" }}
                ></div>
              </div>

              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_f55a7e50bba37ccb229da4780_0827895d85"
                  tabIndex={-1}
                  value=""
                  readOnly
                />
              </div>

              <div className="flex m-auto text-center">
                <button
                  type="submit"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="bg-[#F2720D] hover:bg-[#f24a0d] text-white py-3 px-8 rounded-xl text-xs transition-colors duration-300 flex items-center justify-center min-w-[120px]"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Simple inline message for feedback */}
      {showToast && (
        <div
          className={`mt-4 p-3 rounded-lg ${
            toastType === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          <p>{toastMessage}</p>
          <button
            onClick={() => setShowToast(false)}
            className="ml-2 text-sm underline hover:no-underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
