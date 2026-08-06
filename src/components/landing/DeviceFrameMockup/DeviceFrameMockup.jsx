import "./DeviceFrameMockup.css";

// Purely illustrative: a static, non-interactive recreation of a real
// screen using the app's actual design tokens/classes (not a photographic
// screenshot - see docs note in ProductPreviewSection). The screen itself
// is aria-hidden (it's a picture, not real content); the caption is what a
// screen reader actually announces.
export function DeviceFrameMockup({ label, children }) {

    return (

        <figure className="device-frame-mockup">

            <div className="device-frame-mockup__frame" aria-hidden="true">
                <div className="device-frame-mockup__notch" />
                <div className="device-frame-mockup__screen">
                    {children}
                </div>
            </div>

            <figcaption className="device-frame-mockup__label text-mono-label">{label}</figcaption>

        </figure>

    );

}
