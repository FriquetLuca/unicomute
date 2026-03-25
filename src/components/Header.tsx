interface HeaderProps {
  title: string;
  description: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <header className="mb-8 flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-indigo-600">
          {title}
        </h1>
        <p className="text-slate-500">{description}</p>
      </div>
    </header>
  );
}
