import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);
  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });
  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);
  const image = screen.getByAltText("My profile pic");
  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);
  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });
  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);
  const bio = screen.getByText(/lorem ipsum/i);
  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);
  const githubLink = screen.getByRole("link", { name: /github/i });
  const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );
  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);
  expect(screen.getByLabelText(/name:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);
  expect(screen.getByLabelText(/sports/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/music/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/technology/i)).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);
  expect(screen.getByLabelText(/sports/i)).not.toBeChecked();
  expect(screen.getByLabelText(/music/i)).not.toBeChecked();
  expect(screen.getByLabelText(/technology/i)).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/name:/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/email:/i), { target: { value: 'john@example.com' } });
  expect(screen.getByLabelText(/name:/i)).toHaveValue('John Doe');
  expect(screen.getByLabelText(/email:/i)).toHaveValue('john@example.com');
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);
  fireEvent.click(screen.getByLabelText(/sports/i));
  fireEvent.click(screen.getByLabelText(/music/i));
  expect(screen.getByLabelText(/sports/i)).toBeChecked();
  expect(screen.getByLabelText(/music/i)).toBeChecked();
  expect(screen.getByLabelText(/technology/i)).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/name:/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/email:/i), { target: { value: 'john@example.com' } });
  fireEvent.click(screen.getByLabelText(/sports/i));
  fireEvent.click(screen.getByLabelText(/music/i));
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(screen.getByText(/thank you for signing up, john doe!/i)).toBeInTheDocument();
  expect(screen.getByText(/we've received your email address: john@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/your interests: sports, music/i)).toBeInTheDocument();
});
