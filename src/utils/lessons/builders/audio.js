// Attaches an optional audio reference to a vocabulary entry, an
// example/dialogue line, a feedback field, or a prose block - resolved at
// playback time by resolveAudioSource() (src/utils/audio), never here.
//
//   audio("/audio/english/a1/hello.mp3")  -> { file: "..." } (recorded clip)
//   audio()                                -> {} (no file yet - falls back
//                                              to text-to-speech using
//                                              whatever text this is
//                                              attached to)
//
// Either form is enough for AudioButton to render: presence of the
// `audio` field is the opt-in signal, not whether a file exists yet.
export function audio(file) {
    return file ? { file } : {};
}
