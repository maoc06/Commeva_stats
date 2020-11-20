export default function getUniqueId(arr: any[]) {
    return [...new Set(arr.map(item => item.idbeneficio_Beneficios))];
}