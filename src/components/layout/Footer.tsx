import { Container, Text } from "@/design-system";

export function Footer() {
  return (
    <footer className="border-t border-border-default bg-surface-secondary py-12">
      <Container size="xl">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Text variant="body-sm" color="secondary">
            &copy; {new Date().getFullYear()} YuLife. All rights reserved.
          </Text>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-sm text-text-secondary hover:text-text-primary"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-sm text-text-secondary hover:text-text-primary"
            >
              Terms
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
