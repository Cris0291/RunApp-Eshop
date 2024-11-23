export default async function fileToDataString(file: File){
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onerror = (error) => reject(error);
        reader.onload = (e) => resolve(e.target?.result as string);
    })
}