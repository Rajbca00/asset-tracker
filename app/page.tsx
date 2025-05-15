import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-between p-24 text-center">
      <h1 className="text-4xl font-bold text-primary">Welcome to Asserty!</h1>
      <p className="mt-4 text-lg ">
        A web application to track investments, visualize performance, and
        calculate metrics like XIRR, invested value, and current value.
      </p>

      <Image
        src="/line-graph.png"
        alt="Asserty Landing Image"
        width={800}
        height={200}
        className="mt-8"
      />

      <p className="mt-4 text-sm text-gray-500">
        Asserty is a personal finance tool that helps you manage your
        investments and track your portfolio performance. It provides features
        like investment tracking, performance visualization, and metric
        calculations. The app is designed to be user-friendly and intuitive,
        making it easy for anyone to use. With Asserty, you can easily keep
        track of your investments and make informed decisions about your
        portfolio. The app is built with modern web technologies and is designed
        to be fast and responsive. It is also secure and reliable, ensuring that
        your data is safe and protected. Whether you are a seasoned investor or
        just starting out, Asserty is the perfect tool to help you manage your
        investments and achieve your financial goals. The app is built with
        Next.js, DynamoDB, and deployed on Vercel.
      </p>
    </section>
  );
}
