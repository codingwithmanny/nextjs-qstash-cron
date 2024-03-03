// Imports
// ========================================================
import Check from "@/components/Check";
import FormQStash from "../components/FormQStash";

// Page Component
// ========================================================
export default function Home() {
  // Return
  return (
    <main>
      <div>
        <h1>NextJS QStash Message Scheduler</h1>
        <p>An example demonstrating how you can create a simple scheduler to trigger a NextJS API endpoint.</p>
        <FormQStash />
        <Check />
      </div>
    </main>
  );
}
