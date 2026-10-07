type CartItem = {
  id: string;
  name: string;
  price: number;
};

type Props = {
  items: CartItem[];
};
export default function Cart({ items: items }: Props) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <ul className="flex flex-col gap-3 bg-cart py-4 text-xs">
      {items.map((item) => (
        <li key={item.id} className="flex justify-between gap-2 px-3">
          <span>{item.name}</span>
          <span>&euro;&nbsp;{item.price.toFixed(2)}</span>
        </li>
      ))}
      <li className="mt-auto flex justify-between gap-2 border-t border-muted px-3 pt-2.5 text-sm font-bold">
        <span>Premie</span>
        <span>&euro;&nbsp;{total.toFixed(2)}</span>
      </li>
    </ul>
  );
}
