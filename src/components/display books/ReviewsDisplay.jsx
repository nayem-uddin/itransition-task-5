export default function ReviewsDisplay({ reviewObject }) {
  const { review, reviewer } = reviewObject;
  return (
    <>
      <li className="mt-4">
        <blockquote> {review}</blockquote>
        <span className="blockquote-footer">{reviewer}</span>
      </li>
    </>
  );
}
