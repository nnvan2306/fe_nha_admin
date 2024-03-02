export default function handleValidateVideo(file) {
    return /\.(mp4)$/i.test(file.name);
}
